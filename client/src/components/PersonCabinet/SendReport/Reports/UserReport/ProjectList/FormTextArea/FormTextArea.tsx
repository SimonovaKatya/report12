import * as React from "react";
import "./FormTextArea.scss";
import { useEffect, useRef} from "react";

interface IProps {
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

export default function FormTextArea({onChange, value}: IProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        const element = textareaRef.current
        if(!element) return

        const resizeObserver = new ResizeObserver(() => {
            element.style.height =  element.clientHeight + 'px'
        })

        resizeObserver.observe(element)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    return (
        <textarea
            ref={textareaRef}
            className={"project_info"}
            value={value}
            onChange={onChange}
        />
    );
}
