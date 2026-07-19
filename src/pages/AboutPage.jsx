import { Link } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShieldHalved,
    faTruckFast,
    faHandshake,
    faStar,
    faBox,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

const TEAM = [
    {
        name: "Aryan Shah",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1624797432677-6f803a98acb3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QnVzaW5lc3MlMjBtYW58ZW58MHx8MHx8fDA%3D",
    },
    {
        name: "Priya Mehta",
        role: "Head of Product",
        image: "https://images.unsplash.com/photo-1714976327252-c114f61d8b22?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGluZGlhbiUyMEZlbWFsZSUyMGVtcGxveWVlfGVufDB8fDB8fHww",
    },
    {
        name: "Rohan Verma",
        role: "Lead Engineer",
        image: "https://images.unsplash.com/photo-1753452265240-adc4d7a0821a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZGlhbiUyMHNvZnR3YXJlJTIwbGVhZCUyMGVuZ2luZWVyJTIwcGVyc29uJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
    },
    {
        name: "Sneha Kapoor",
        role: "Design Director",
        image: "https://plus.unsplash.com/premium_photo-1683133601863-2934dd98cfc3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmVtYWxlJTIwZGVzaWduZXIlMjBkaXJlY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
    },
];

const VALUES = [
    {
        icon: faShieldHalved,
        title: "Trust",
        desc: "Every product is verified for quality and authenticity before listing.",
    },
    {
        icon: faTruckFast,
        title: "Speed",
        desc: "We obsess over delivery times so your orders arrive when promised.",
    },
    {
        icon: faHandshake,
        title: "Community",
        desc: "Built around real customer feedback, not just business metrics.",
    },
    {
        icon: faStar,
        title: "Quality",
        desc: "We curate the best — no filler, no junk, just great products.",
    },
];

export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            {/* =============================================================== HERO SECTION ================================================================ */}
            <div className="text-center mb-16">
                <div className="w-16 h-16 bg-volt rounded-3xl flex items-center justify-center mx-auto mb-6 animate-float">
                    <Zap size={28} className="text-ink fill-ink" />
                </div>
                <h1 className="font-heading font-bold text-4xl sm:text-5xl mb-5">
                    About <span className="text-volt">SkyMart</span>
                </h1>
                <p className="text-white/40 font-body text-lg max-w-2xl mx-auto leading-relaxed">
                    SkyMart is a next-generation e-commerce platform built to
                    make online shopping fast, fair, and enjoyable — for
                    everyone.
                </p>
            </div>

            {/* =============================================================== STATS SECTION =============================================================== */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
                {[
                    { icon: faBox, value: "20K+", label: "Products" },
                    { icon: faUsers, value: "50K+", label: "Happy Customers" },
                    { icon: faStar, value: "4.9", label: "Avg. Rating" },
                    {
                        icon: faTruckFast,
                        value: "99%",
                        label: "On-time Delivery",
                    },
                ].map(({ icon: Icon, value, label }) => (
                    <div
                        key={label}
                        className="bg-[#111] border border-white/8 rounded-2xl p-5 text-center"
                    >
                        <FontAwesomeIcon
                            icon={Icon}
                            className="text-volt text-xl mx-auto mb-2 block"
                        />
                        <p className="font-heading font-bold text-2xl text-white">
                            {value}
                        </p>
                        <p className="text-white/30 text-xs font-body mt-1">
                            {label}
                        </p>
                    </div>
                ))}
            </div>

            {/* =============================================================== STORY SECTION =============================================================== */}
            <div className="bg-[#111] border border-white/8 rounded-3xl p-8 sm:p-10 mb-12">
                <h2 className="font-heading font-bold text-2xl mb-4">
                    Our Story
                </h2>
                <div className="space-y-4 text-white/50 font-body text-sm leading-relaxed">
                    <p>
                        SkyMart started in 2022 as a small side project — two
                        engineers tired of bloated, slow e-commerce experiences.
                        We asked ourselves: what if shopping online was actually
                        <em className="text-white/70"> enjoyable</em>?
                    </p>
                    <p>
                        Three years later, SkyMart serves over 50,000 customers
                        across the country. We stock electronics, fashion,
                        jewelry, and everyday essentials — all at prices that
                        don't require a second mortgage.
                    </p>
                    <p>
                        We're still the same team at heart: obsessed with speed,
                        transparency, and making you feel good about every
                        purchase you make here.
                    </p>
                </div>
            </div>

            {/* ============================================================== VALUES SECTION =============================================================== */}
            <section className="mb-12">
                <h2 className="font-heading font-bold text-2xl mb-6 text-center">
                    What We Stand For
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {VALUES.map(({ icon: Icon, title, desc }) => (
                        <div
                            key={title}
                            className="bg-[#111] border border-white/8 hover:border-volt/25 rounded-2xl p-6 transition-all duration-200 flex gap-4"
                        >
                            <div className="w-10 h-10 bg-volt/10 rounded-xl flex items-center justify-center shrink-0">
                                <FontAwesomeIcon
                                    icon={Icon}
                                    className="text-volt text-lg"
                                />
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-white text-base mb-1">
                                    {title}
                                </h3>
                                <p className="text-white/40 font-body text-sm leading-relaxed">
                                    {desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* =============================================================== TEAM SECTION ================================================================ */}
            <section className="mb-12">
                <h2 className="font-heading font-bold text-2xl mb-6 text-center">
                    Meet the Team
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {TEAM.map(({ name, role, image }) => (
                        <div
                            key={name}
                            className="bg-[#111] border border-white/8 rounded-2xl p-5 text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-3 border border-white/10">
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="font-body font-semibold text-white/80 text-sm">
                                {name}
                            </p>
                            <p className="text-white/30 text-xs mt-0.5">
                                {role}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* =========================================================== READY TO SHOP SECTION =========================================================== */}
            <div className="bg-volt/8 border border-volt/20 rounded-3xl p-8 text-center">
                <h2 className="font-heading font-bold text-2xl text-white mb-3">
                    Ready to shop?
                </h2>
                <p className="text-white/40 font-body text-sm mb-6">
                    Explore thousands of products at unbeatable prices.
                </p>
                <Link
                    to="/products"
                    className="btn-volt inline-flex items-center gap-2 px-8 py-3.5 text-base font-heading font-bold"
                >
                    Browse Products <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}
