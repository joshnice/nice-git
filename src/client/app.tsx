import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "./pages/home-page";
import "./index.css";
import "./font-awesome/library";

const root = createRoot(document.body);
root.render(<RootComponent />);

const queryClient = new QueryClient();

function RootComponent() {
	return (
		<QueryClientProvider client={queryClient}>
			<HomePage />
		</QueryClientProvider>
	);
}
