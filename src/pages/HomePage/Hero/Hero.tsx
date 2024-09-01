import React, {useEffect, useMemo, useState} from "react";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";

import "./Hero.scss";


const texts: { [key: number]: string[] } = {
    0: [
        // General
        "🚀 Code is my canvas; elegance is my masterpiece.",
        "🚀 Coding my way through the digital universe!",
        "🚀 Coding with a dash of innovation!",
        "🚀 Coding with a sprinkle of creativity!",
        "🚀 Coding with a touch of elegance!",
        "🚀 Coding with a touch of magic!",
        "🚀 Coding with a touch of passion!",
        "🚀 Coding with a touch of style!",
        "🌟 Crafting code and chasing dreams.",
        "💡 Ctrl + Alt + Defeat is not in my vocabulary.",
        "🌙 Debugger by day, dreamer by night. What's your superpower?",
        "🔮 Embracing a world of brackets, semicolons, and creative chaos.",
        "🔓 Hacking the boundaries of reality with lines of code.",
        "👋 Hello, World!",
        "☕ I don't sweat, I debug in style.",
        "✨ Let's build something magic together!",
        "🚀 Launching into the universe of code, propelled by creativity.",
        "🌟 Navigating the digital matrix with a keyboard as my compass.",
        "🌟 Welcome to my digital domain!",
        "🌟 Welcome to my digital realm!",
        "🌟 Welcome to my digital world!",
        "🔥 Writing code that sets keyboards on fire."
    ],
    // January-specific
    1: [
        "🎉 Happy New Year! 🎊",
        "🎆 A new year, a new beginning!",
        "🌟 New year, new code!",
        "🎆 New year, new dreams!",
        "🌟 New year, new goals!",
        "🎉 New year, new opportunities!"
    ],
    // February-specific
    2: [
        "💘 Coding with a heart of gold!",
        "💘 Coding with a sprinkle of love!",
        "💖 Coding with all my love!",
        "💖 Love is in the code!"
    ],
    // March-specific
    3: [
        "🍀 Coding is my lucky charm!",
        "🌈 Coding with a pinch of luck!",
        "🍀 Coding with a pot of gold!",
        "🍀 Luck of the coder!",
        "🌈 Rainbow of code!"
    ],
    // April-specific
    4: [
        "🎂 Birthday month!",
        "🤡 April fools! 🎈",
        "🃏 Gotcha! 🎉",
        "🤪 Prankster at work!",
        "🎈 Fool me once, shame on you!",
        "🌸 April showers bring May flowers!",
        "🌷 Spring has sprung!",
        "🌼 Flowers where you are planted!",
        "🌸 April showers bring code flowers!",
        "🌷 Spring has sprung, and so have I!",
        "🌼 Coding and blooming!"
    ],
    // May-specific
    5: [
        "🌺 Blooming with code!",
        "🌼 Blooming with creativity!",
        "🌺 Blossoming with code!",
        "🌸 Coding with a bouquet of ideas!",
        "🌸 Coding with a spring in my step!",
        "🌸 Coding with a touch of nature!",
        "🌺 Coding with a touch of spring!",
        "🌺 Coding with a touch of sunshine!",
        "🌷 Springing into code!"
    ],
    // June-specific
    6: [
        "🌊 Catching waves of inspiration!",
        "🌞 Chasing sunsets and debugging sunrises!",
        "🌊 Making a splash in the world of coding!",
        "🌊 Riding the waves of creativity!",
        "🌞 Soaking up the sun and coding up a storm!",
        "🌞 Summer vibes only!"
    ],
    // July-specific
    7: [
        "🍦 Chilling with code and ice cream!",
        "🍦 Coding with a cherry on top!",
        "🍦 Coding with a scoop of fun!",
        "🍦 Coding with a sprinkle of summer!",
        "🍦 Coding with an extra scoop of creativity!",
        "🍦 Coding with sprinkles on top!"
    ],
    // August-specific
    8: [
        "🌴 Coding under the shade of palm trees!",
        "🌴 Coding with a splash of summer!",
        "🌴 Coding with a tropical twist!",
        "🌴 Coding with an island breeze!",
        "🌴 Summer coding vibes!"
    ],
    // September-specific
    9: [
        "📚 Back to school, back to code!",
        "📚 Coding my way through the school year!",
        "🍂 Coding with a touch of fall!",
        "🍁 Fall-ing into code!",
        "📚 School's in session, and so is coding!"
    ],
    // October-specific
    10: [
        "🦇 Bats about to fly!",
        "🎃 Creepin' it real!",
        "🍂 Coding with a touch of fall!",
        "🍁 Fall-ing into code!",
        "👻 Ghostly greetings!",
        "🍂 Leafing through lines of code!",
        "🎃 Pumpkin spice and everything nice!",
        "👻 Spooky season is here!",
        "🎃 Trick or treat! 🍭",
        "🎃 Witchful thinking!"
    ],
    // November-specific
    11: [
        "🍂 Autumn leaves and lines of code!",
        "🍁 Giving thanks for code!",
        "🦃 Gobbling up code like a turkey!",
        "🍁 Harvesting lines of code!",
        "🍂 Leafing through lines of code!",
    ],
    // December-specific
    12: [
        "🎁 Happy holidays! 🎄",
        "❄️ Let it snow, let it snow, let it snow!",
        "🎅 Ho ho ho!",
        "🎄 Have yourself a merry little Christmas!",
        "🦌 Rudolph the red-nosed reindeer!",
        "🌟 Starlight, star bright!",
        "🎁 All I want for Christmas is you!"
    ],
};

export default function Hero() {
    const currentMonth = useMemo(() => new Date().getMonth() + 1, []);

    // combine general and month-specific texts
    const combinedTexts = useMemo(() => [...texts[0], ...texts[currentMonth]], [currentMonth]);

    const [headerText, setHeaderText] = useState("");
    const [textIndex, setTextIndex] = useState(Math.floor(Math.random() * combinedTexts.length));
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {
        const typeText = () => {
            setIsBlinking(false);
            if (!isDeleting) {
                setHeaderText((prev) => prev + combinedTexts[textIndex][charIndex]);
                setCharIndex((prev) => prev + 1);
            } else {
                setHeaderText((prev) => prev.slice(0, -1));
                setCharIndex((prev) => prev - 1);
            }
        };

        if (!isDeleting && charIndex < combinedTexts[textIndex].length) {
            const timeout = setTimeout(typeText, 45); // typing delay
            return () => clearTimeout(timeout);
        } else if (isDeleting && charIndex > 0) {
            const timeout = setTimeout(typeText, 15); // deleting delay
            return () => clearTimeout(timeout);
        } else {
            setIsBlinking(true);
            const timeout = setTimeout(() => {
                if (isDeleting) {
                    setTextIndex(Math.floor(Math.random() * combinedTexts.length));
                    setIsDeleting(false);
                    setCharIndex(0);
                } else {
                    setIsDeleting(true);
                }
            }, isDeleting ? 150 : 2500); // delay before deleting and after typing
            return () => clearTimeout(timeout);
        }
    }, [charIndex, combinedTexts, isDeleting, textIndex]);

    const tl = gsap.timeline();

    useGSAP(() => {
        tl.to(".hero_glowing-separator", {
            width: "120%",
            opacity: 1,
            ease: "nativeEase",
            duration: 1.20
        });
    });

    useGSAP(() => {
        tl.from([".hero_hero-text"], {
            yPercent: 100,
            ease: "nativeEase",
            duration: 1.10
        }, 0.40);
    });

    useGSAP(() => {
        tl.from([".hero_text-small"], {
            yPercent: -100,
            ease: "nativeEase",
            duration: 0.9
        }, 0.80);
    });

    useGSAP(() => {
        tl.from(".hero_about", {
            yPercent: 100,
            y: 50,
            ease: "nativeEase",
            duration: 1,
            stagger: 0.15
        }, 1.20);
    });

    useGSAP(() => {
        tl.from(".hero_typing-text", {
            opacity: 0,
            ease: "nativeEase",
            duration: 1
        });
    });

    return (
        <>
            <div className="hero">
                <p style={{opacity: "50%", fontSize: "135%"}}>!!! Major refactor in progress. Website should be back up in a few days. !!!</p>
                <div className="hero_container">
                    <div className="text-block">
                        <h1 className="hero_hero-text">Hello</h1>
                    </div>

                    <div className="hero_glowing-separator" />

                    <div className="text-block">
                        <h1 className="hero_text-small">I'm Jerry!</h1>
                    </div>
                </div>

                <div className="text hero_about-container">
                    <div className="text-block"><p className="hero_about">
                        Hey there, I'm Jerry - a coding enthusiast residing in 🍁Canada🦫!
                    </p></div>
                    <div className="text-block"><p className="hero_about">
                        AI, machine learning, computer vision, networking, game engines.
                    </p></div>
                </div>

                <p className="hero_typing-text p-text">
                    {headerText}<span id="caret" className={isBlinking ? "blink_anim" : ""}>|</span>
                </p>
            </div>
            <div className="hero_shadow" />
        </>
    );
};
