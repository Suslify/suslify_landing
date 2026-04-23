import { useToastContext } from "../providers/ToastProvider";

export default function useToast() {
	return useToastContext();
}
