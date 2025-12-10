import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const NotFound = () => {
    return (
        <section className="max-w-5xl m-auto flex flex-col min-h-screen bg-background text-foreground font-sans">
            <div className="flex items-center justify-center flex-1 px-5 py-12">
                <div className="text-center w-full max-w-md">
                    <div className="mb-8">
                        <div className="size-32 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon icon="solar:ghost-smile-bold" className="size-16 text-primary" />
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold font-heading mb-4 text-primary">
                            404
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-bold font-heading mb-3">
                            Page Not Found
                        </h2>
                        <p className="text-muted-foreground text-base">
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link 
                            to="/" 
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-md hover:opacity-90 active:opacity-80 transition-all"
                        >
                            <Icon icon="solar:home-2-bold" className="size-5" />
                            Go Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:opacity-80 transition-all"
                        >
                            <Icon icon="solar:arrow-left-bold" className="size-5" />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;