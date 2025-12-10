import { Icon } from "@iconify/react";

const DeleteConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Confirm Delete",
    message = "Are you sure you want to delete this item?",
    itemName = "",
    loading = false
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-card rounded-2xl p-6 max-w-md w-full border border-border shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                    <div className="size-12 rounded-full bg-destructive/10 flex items-center justify-center">
                        <Icon icon="solar:trash-bin-trash-bold" className="size-6 text-destructive" />
                    </div>
                    <h3 className="text-xl font-bold font-heading">
                        {title}
                    </h3>
                </div>
                
                <p className="text-foreground mb-2">
                    {message}
                </p>
                {itemName && (
                    <p className="text-sm font-semibold text-muted-foreground mb-6">
                        {itemName}
                    </p>
                )}
                
                <div className="flex gap-2">
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 font-semibold"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-80 transition-colors disabled:opacity-50 font-semibold"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;

