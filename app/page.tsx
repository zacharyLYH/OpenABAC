export default async function Home() {
    const resp = await fetch('http://localhost:3000/api/test');
    const result = await resp.json();

    return (
        <div>
            hi
            {result.message}
        </div>
    );
}
