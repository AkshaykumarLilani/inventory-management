import { toast } from "react-toastify";

export const notify = (msg, type) => {
    switch (type) {
        case "success": {
            toast.success(msg);
            break;
        }
        case "info": {
            toast.info(msg);
            break;
        }
        case "error": {
            toast.error(msg);
            break;
        }
        case "warning": {
            toast.warning(msg);
            break;
        }
        default: {
            toast.info(msg);
        }
    }
}