import { CheckCircledIcon } from "@radix-ui/react-icons"


interface FormSuccessProps {
    success: string;
}

export default function FormSuccess({ success }: FormSuccessProps) {
    if (!success) return null;
    return (
        <div className="flex items-center gap-2 text-green-500">
            <CheckCircledIcon className="w-4 h-4" />
            <p>{success}</p>
        </div>
    );
}   