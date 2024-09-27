"use client";

import React, { useState } from "react";
import QRCode from "react-qr-code";
import { z } from "zod";

const dnsSchema = z
    .string()
    .url()
    .refine(
        (url) => {
            const pattern = /^https?:\/\/[a-z0-9]+([-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
            return pattern.test(url);
        },
        {
            message: "Invalid DNS link. Please enter a valid URL.",
        },
    );

export default function Home() {
    const [inputValue, setInputValue] = useState("");
    const [qrValue, setQrValue] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validation = dnsSchema.safeParse(inputValue);
        if (validation.success) {
            setError("");
            setQrValue(inputValue);
        } else {
            setError(validation.error.errors[0].message);
        }
    };

    return (
        <>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "50px" }}>
                    <a
                        href="https://github.com/AlexGalhardo/qrcode.alexgalhardo.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            textDecoration: "none",
                            background: "linear-gradient(90deg, #0070f3, #ff4081)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        QR Code Generator
                    </a>
                </h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter DNS link"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        style={{
                            padding: "10px",
                            width: "80%",
                            maxWidth: "300px",
                            marginBottom: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: "10px 20px",
                            marginLeft: "10px",
                            borderRadius: "5px",
                            border: "none",
                            background: "#0070f3",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        Generate QR Code
                    </button>
                </form>
                {error && <p style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>{error}</p>}
                {qrValue && (
                    <div
                        style={{
                            height: "auto",
                            margin: "50px auto",
                            maxWidth: 256,
                            width: "100%",
                        }}
                    >
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={qrValue}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
