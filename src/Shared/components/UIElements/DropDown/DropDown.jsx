import React, { useState } from "react";
import styles from "./DropDown.module.css";

const Dropdown = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <div className={styles.dropdownContainer}>
            <div className={styles.dropdownHeader} onClick={toggleDropdown}>
                <h3>{title}</h3>
                <span>{isOpen ? "▲" : "▼"}</span>
            </div>
            {isOpen && (
                <div className={styles.dropdownContent}>
                    <p>{content}</p>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
