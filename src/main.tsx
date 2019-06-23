import * as React from 'react';
import * as ReactDOM from 'react-dom';

class JapaneseEra {
    constructor(private _ce: number, private _je: string, private _diff: number) {}
    get ce(): number { return this._ce; }
    get je(): string { return this._je; }
    get diff(): number { return this._diff; }
}

class JapaneseDate {
    private _year: number;
    private _month: number;
    private _day: number;
    private _japaneseDays: string;
    constructor(private _date: number) {
        const dateString = _date.toString();
        this._year = parseInt(dateString.slice(0, 4));
        this._month = parseInt(dateString.slice(4, 6));
        this._day = parseInt(dateString.slice(-2));
        this._japaneseDays = this._month + "月" + this._day + "日";
    }
    get date(): number { return this._date; }
    get year(): number { return this._year; }
    get japaneseDays(): string { return this._japaneseDays; }
}

interface EraProps {
}

interface EraState {
    inputValue: string;
    outputValue: string;
}

class ConvertEra extends React.Component<EraProps, EraState> {
    idName  = "convertEra";
    constructor(props: EraProps) {
        super(props);
        this.state = {
            inputValue: '',
            outputValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    ceToJe(value: string): string {
        const ce = this.stringToJapaneseDate(value);
        const reiwa = new JapaneseEra(20190501, "令和", 2018);
        const heisei = new JapaneseEra(19890108, "平成", 1988);
        const syowa = new JapaneseEra(19261225, "昭和", 1925);
        const taisyo = new JapaneseEra(19120730, "大正", 1911);
        const meiji = new JapaneseEra(18680125, "明治", 1867);

        switch(true) {
            case ce.date >= reiwa.ce:
                return reiwa.je + (ce.year - reiwa.diff) + "年" + ce.japaneseDays;
            case ce.date >= heisei.ce:
                return heisei.je + (ce.year - heisei.diff) + "年" + ce.japaneseDays;
            case ce.date >= syowa.ce:
                return syowa.je + (ce.year - syowa.diff) + "年" + ce.japaneseDays;
            case ce.date >= taisyo.ce:
                return taisyo.je + (ce.year - taisyo.diff) + "年" + ce.japaneseDays;
            case ce.date >= meiji.ce:
                return meiji.je + (ce.year - meiji.diff) + "年" + ce.japaneseDays;
            default:
                return "計算不能";
        }
    }
    stringToJapaneseDate(value: string): JapaneseDate {
        const ce = parseInt(value.split('/').join(''));
        return new JapaneseDate(ce);
    }
    handleChange(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            inputValue: event.currentTarget.value
        });
    }
    handleClick(): void {
        const reg = /[1,2][0,8,9]\d{2}\/[0,1]\d{1}\/[0,1,2,3]\d{1}/;
        if(!reg.test(this.state.inputValue)) 
            this.setState({ outputValue: "1800年以降の西暦を入力してください！" });
        else {
            const je = this.ceToJe(this.state.inputValue);
            console.log(je);
            this.setState({ outputValue: je });
        }
    }
    render(): JSX.Element {
        return(
        <div>
            <Input name={this.state.inputValue} handleChange={this.handleChange} />
            <Button handleClick={this.handleClick} />
            <Output outputEra={this.state.outputValue} />
        </div>);
    }
}

interface InputProps {
    name: string;
    handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Input: React.SFC<InputProps> = props => {
    const { name, handleChange } : InputProps = props;
    return (
        <input 
            type="text" 
            placeholder="yyyy/MM/dd" 
            id="convertEra" 
            value={name} 
            onChange={handleChange} 
         />
    )
}

interface ButtonProps {
    handleClick: () => void;
}

const Button: React.SFC<ButtonProps> = props => {
    const { handleClick }: ButtonProps = props;
    return <button onClick={handleClick}>Convert Era to Japanese</button>
}

interface OutputProps {
    outputEra: string;
}

const Output: React.SFC<OutputProps> = props => {
    const { outputEra }: OutputProps = props;
    const hasInput: boolean = outputEra !== '';
    const result: JSX.Element | '' = hasInput ? (
        <p> {outputEra} </p>
    ) : (
        ''
    );
    return <div>{result}</div>
}

ReactDOM.render(
    <ConvertEra />, document.querySelector(".content")
);
//console.log("hello");