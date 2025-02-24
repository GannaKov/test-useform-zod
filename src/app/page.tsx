type ContactProps = {
  id: number;
  name: string;
  email: string;
};

export default async function Home() {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const contacts = await data.json();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen px-8 py-20 gap-16 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <ul>
          {contacts &&
            contacts.map(({ id, name, email }: ContactProps) => (
              <li key={id}>
                <strong>{name}</strong> - {email}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
