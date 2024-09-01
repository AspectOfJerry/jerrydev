import React, {useEffect, useState} from "react";
import {Chip} from "@mui/joy";
import {LinearProgress} from "@mui/material";
import "./SkillCard.scss";

export default function SkillCard({logo, title, description, score, chipText}: {
    logo: string;
    title: string;
    description: string;
    score: number;
    chipText: string;
}) {
    const [progress, setProgress] = useState<number | 0>()
    const [buffer, setBuffer] = useState<number | 0>()

    useEffect(() => {
        setProgress(score * 20);
        setBuffer((score + 1) * 20);
    }, []);

    return (
        <div className="skillcard">
            <img src={logo} alt={`${title} logo`} className="skillcard_logo" />
            <div className="skillcard_content">
                <h3 className="skillcard_title">{title}</h3>
                <p className="skillcard_description">{description}</p>
                <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} className="skillcard_progress" />
                <Chip className="skillcard_chip">{chipText}</Chip>
            </div>
        </div>
    );
}