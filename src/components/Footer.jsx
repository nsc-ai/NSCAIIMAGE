import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-12 py-6 text-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} NSC AI. Powered by Kie.ai & Gemini.</p>
            <p className="text-xs mt-1 text-slate-600">Simulations are for visualization purposes only.</p>
        </footer>
    );
};

export default Footer;
