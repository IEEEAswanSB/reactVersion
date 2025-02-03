/* eslint-disable prettier/prettier */
import { createContext, useState, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const SnackbarContext = createContext();

export const useSnackbar = () => {
	const context = useContext(SnackbarContext);
	if (!context) throw new Error("useSnackbar must be used within a SnackbarProvider");

	return context;
};

// Function to detect and convert URLs to anchor tags
const formatMessageWithLinks = (message) => {
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	return message.split(urlRegex).map((part, index) => {
		if (part.match(urlRegex)) {
			return (
				<a
					key={index}
					href={part}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-300 underline hover:text-blue-200"
				>
					{part}
				</a>
			);
		}
		return part;
	});
};

export const SnackbarProvider = ({ children }) => {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarTitle, setSnackbarTitle] = useState("");
	const [snackbarType, setSnackbarType] = useState("default");

	const openSnackbar = (message, options = {}) => {
		const { title = "", type = "default" } = options;

		setSnackbarMessage(message);
		setSnackbarTitle(title);
		setSnackbarType(type);
		setSnackbarOpen(true);

		setTimeout(() => {
			closeSnackbar();
		}, options.duration || 6000);
	};

	const closeSnackbar = () => {
		setSnackbarOpen(false);
		setSnackbarMessage("");
		setSnackbarTitle("");
		setSnackbarType("default");
	};

	const getTypeStyles = (type) => {
		switch (type) {
			case "success":
				return "bg-green-600";
			case "error":
				return "bg-red-600";
			case "warning":
				return "bg-yellow-600";
			case "signal":
				return "animated-gradient";
			case "notification":
				return "bg-[#6C569E]";
			default:
				return "bg-[#6240c0]";
		}
	};

	const variants = {
		initial: {
			x: "100%",
			opacity: 0,
		},
		animate: {
			x: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 20,
			},
		},
		exit: {
			x: "100%",
			opacity: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 20,
			},
		},
	};

	return (
		<SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
			{children}
			<AnimatePresence>
				{snackbarOpen && (
					<motion.div
						className={`fixed top-10 z-[99999] max-w-[400px] right-10 mx-auto w-fit rounded-lg ${getTypeStyles(
							snackbarType,
						)} p-4 text-lg font-semibold text-white`}
						initial="initial"
						animate="animate"
						exit="exit"
						variants={variants}
					>
						<div className="relative"></div>
						<button
							onClick={closeSnackbar}
							className="absolute right-2 top-2 rounded-full p-1 transition-colors hover:bg-white/20"
							aria-label="Close notification"
						>
							<X size={16} />
						</button>
						{snackbarTitle && <h3 className="mb-2 pr-6 font-bold">{snackbarTitle}</h3>}
						<p className="pr-6">{formatMessageWithLinks(snackbarMessage)}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</SnackbarContext.Provider>
	);
};