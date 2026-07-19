    import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import DotField from "./DotField";

export default function Layout() {
    return (
        <>
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <DotField
                    dotRadius={4}
                    dotSpacing={14}
                    bulgeStrength={67}
                    glowRadius={160}
                    sparkle={false}
                    waveAmplitude={0}
                    cursorRadius={500}
                    cursorForce={0.1}
                    bulgeOnly
                    gradientFrom="rgba(168, 85, 247, 0.35)"
                    gradientTo="rgba(180, 151, 207, 0.25)"
                    glowColor="#120F17"
                />
            </div>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <footer className="border-t-2 border-dotted border-purple-500/30 py-4 text-center mt-20">
                <p className="font-heading text-volt text-xl mb-1">SkyMart</p>
                <p className="text-white/30 text-xs">
                    &copy; 2026 SkyMart -- Built with React + Redux
                </p>
            </footer>
        </>
    );
}
