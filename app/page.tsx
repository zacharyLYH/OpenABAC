export default async function Home() {
    const resp = await fetch('http://localhost:3000/api/test', {
        cache: 'no-store',
    });
    const result = await resp.json();
    return (
        <main>
            Landing page
            {result.message}
        </main>
    );
}
