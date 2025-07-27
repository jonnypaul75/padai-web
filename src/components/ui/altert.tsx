import React, { useEffect } from "react";
import {
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationCircle
} from "react-icons/fa";
import { type IconType } from "react-icons";

type AlertType = "success" | "info" | "danger" | "warning" | "dark";

interface AlertProps {
    message: string;
    type?: AlertType;
    delay?: number; // animation delay in seconds
    autoHideDuration?: number; // auto-hide in milliseconds
    onClose?: () => void;
}

const iconMap: Record<AlertType, IconType> = {
    success: FaCheckCircle,
    info: FaCheckCircle,
    danger: FaTimesCircle,
    warning: FaExclamationCircle,
    dark: FaExclamationCircle
};

export const Alert: React.FC<AlertProps> = ({
    message,
    type = "info",
    delay = 0,
    autoHideDuration = 1500,
    onClose
}) => {
    const Icon = iconMap[type];

    useEffect(() => {
        if (autoHideDuration && onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, autoHideDuration);
            return () => clearTimeout(timer);
        }
    }, [autoHideDuration, onClose]);

    return (
        <div
            className={`alert alert_${type}`}
            style={{ animationDelay: `${delay}s` }}
        >
            <div className="alert--icon">
                <Icon />
            </div>
            <div className="alert--content">{message}</div>
            <div className="alert--close" onClick={onClose}>
                <FaTimesCircle />
            </div>
        </div>
    );
};
