import { Card } from 'primereact/card';

export default function Home(props) {
    return (
        <div>
            <Card title={props.mensaje} style={{ width: '50rem', marginBottom: '2em' }}>
                <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                    CRUD de entitades relacionadas a Accidentes.</p>
            </Card>
        </div>
    );
}
