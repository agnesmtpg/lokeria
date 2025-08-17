export default function WelcomeDashboard() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <h1 className="text-3xl sm:text-4xl font-bold">Selamat Datang Ke Dashboard</h1>
        <p className="mt-4 text-lg max-w-lg">
            Kamu bisa create, read, update, dan delete data lowongan ini
        </p>
        </div>
    );
}
