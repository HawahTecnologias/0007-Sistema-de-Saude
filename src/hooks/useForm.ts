import { useState, ChangeEvent } from "react";

function useForm<FormData>(fields: FormData) {

    const [formValues, setFormValues] = useState<FormData>(fields);

    const onChange = (input: keyof FormData) => 
        (element: ChangeEvent<HTMLInputElement>) => {
            const { value }= element.target;
            setFormValues((old) => ({ ...old, [input]: value }));
    }

    const onSelect = (name: string, value: string) => {
        setFormValues((old) => ({ ...old, [name]: value }));
    }

    const handleSelectFilds = (input: keyof FormData) => {
        return {
            name: input,
            onSelect: onSelect,
        };
    };

    const handleFilds = (input: keyof FormData) => {
        return {
            label: input,
            handleChange: onChange(input),
        };
    };
	return {
        formValues,
        onChange,
        onSelect,
        handleFilds,
        handleSelectFilds,
	};
}

export default useForm;
