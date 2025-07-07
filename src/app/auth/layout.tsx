
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>
) {
    return (
        <div className="w-max h-screen flex items-center m-auto">
            {children}
        </div>
    );
}
