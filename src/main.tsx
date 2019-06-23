import * as React from 'react';
import * as ReactDOM from 'react-dom';

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
        const ce = this.stringToCe(value);
        return ce.toString();
    }
    stringToCe(value: string): number {
        const ceString = value.split('/').join('');
        return parseInt(ceString);
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
            this.setState({ outputValue: "とりあえず西暦！" });
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