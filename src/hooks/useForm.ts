import { useState, ChangeEvent } from "react";

function useForm<FormData>(fields: FormData) {

    const [formValues, setFormValues] = useState<FormData>(fields);

    const handleChange = (input: keyof FormData) => 
    (element: ChangeEvent<HTMLInputElement>) => {
        console.log(element);
        console.log(element.target.value);
        const { value }= element.target;
        setFormValues((old) => ({ ...old, [input]: value }));
        console.log(formValues);
    }

    const handleFilds = (input: keyof FormData) => {
        return {
            label: input,
            handleChange: handleChange(input),
        };
    };
	return {
        formValues,
        handleChange,
        handleFilds,
	};
}

export default useForm;
