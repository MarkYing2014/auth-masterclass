import { ExclamationTriangleIcon } from "@radix-ui/react-icons"


interface FormErrorProps {
    message?: string;
}

export default function FormError({ message }: FormErrorProps) {
    if (!message) return null;
    return (
        <div className="flex items-center gap-2 text-red-500">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <p>{message}</p>
        </div>
    );
}   
