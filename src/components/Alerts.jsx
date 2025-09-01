import PropTypes from "prop-types";
import { InformationCircleIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/16/solid"

const Alert = ({ message, type = "info", icon, title }) => {
  // Mapear colores e iconos según el tipo
  const alertTypes = {
    info: {
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      borderColor: "border-blue-300",
      defaultIcon: <InformationCircleIcon className="w-14 h-14" />,
    },
    success: {
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      borderColor: "border-green-300",
      defaultIcon: <CheckCircleIcon className="w-14 h-14" />,
    },
    warning: {
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-300",
      defaultIcon: <ExclamationTriangleIcon className="w-14 h-14" />,
    },
    error: {
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      borderColor: "border-red-300",
      defaultIcon: <XCircleIcon className="w-14 h-14" />,
    },
  };

  const { bgColor, textColor, borderColor, defaultIcon } = alertTypes[type] || alertTypes.info;

  return (
    // {`fixed inset-0 z-50 flex items-start p-4 mb-4 border-l-4 rounded ${bgColor} ${textColor} ${borderColor} backdrop-blur-md bg-opacity-50 bg-gray-800`}

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-none">
      <div
        className={`flex flex-col items-center p-8 py-16 mb-4 border-4 rounded ${bgColor} ${textColor} ${borderColor} bg-white shadow-lg`}
      >
        <span className="pb-4">{icon || defaultIcon}</span>
        {title && <h4 className="font-bold text-2xl">{title}</h4>}
        {message && <p className="text-base p-4">{message}</p>}
      </div>
    </div>
  );
};


Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["info", "success", "warning", "error"]),
  icon: PropTypes.node,
  title: PropTypes.string,
};

export default Alert;
