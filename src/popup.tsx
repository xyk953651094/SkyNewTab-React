import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap-icons/font/bootstrap-icons.css';
import PopupComponent from "./components/popupComponent"

const popupRoot = ReactDOM.createRoot(
    document.getElementById("popupRoot") as HTMLElement
);
popupRoot.render(
    <PopupComponent />
);