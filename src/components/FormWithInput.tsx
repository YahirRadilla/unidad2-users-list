import { useState, useEffect } from 'react';

type FormWithInputProps = {
    buttonText: string;
    onSubmit: (data: { name: string; email: string }) => void;
    initialValues?: { name: string; email: string };
};

const FormWithInput = ({ buttonText, onSubmit, initialValues }: FormWithInputProps) => {
    const [formData, setFormData] = useState(initialValues || { name: '', email: '' });

    useEffect(() => {
        if (initialValues) {
            setFormData(initialValues);
        }
    }, [initialValues?.name, initialValues?.email]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                type="text"
                placeholder="Introduce tu nombre"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                name="email"
                type="email"
                placeholder="Introduce tu email"
                value={formData.email}
                onChange={handleChange}
            />
            <button type="submit">{buttonText}</button>
        </form>
    );
};

export default FormWithInput;
