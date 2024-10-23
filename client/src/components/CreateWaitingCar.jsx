import { useState } from 'react';
import { Card, Input, Button, message } from 'antd';
import useFetch from '../hooks/useFetch';

const CreateWaitingCar = () => {
    const [originalPosition, setOriginalPosition] = useState('');
    const { data, error, loading, fetchData } = useFetch();
    console.log('fetchData CreateWaitingCar:', data)

    const handleCreateVehicle = () => {
        if (!originalPosition) {
            message.error('Please enter a vehicle number.');
            return;
        }

        const requestBody = { originalPosition: Number(originalPosition) };
        console.log('Body:', requestBody)

        fetchData('/add-car-to-queque', 'POST', requestBody)
            .then(() => {
                message.success('Card added to queque successfully!');
                setOriginalPosition('');
            })
            .catch((err) => {
                message.error(
                    'Failed to add card to queque. Please try againt.'
                );
                console.error(err);
            });
    };

    return (
        <Card
            title="Add Car to Waiting Queque"
            bordered={false}
            style={{ width: 400 }}
        >
            <p>Enter the vehicle waiting for an available parking space.</p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Input
                    type="number"
                    placeholder="Vehicle position"
                    value={originalPosition}
                    onChange={(e) => setOriginalPosition(e.target.value)}
                    style={{ width: '200px' }}
                />
                <Button
                    type="primary"
                    onClick={handleCreateVehicle}
                >
                    Create Car
                </Button>
            </div>
        </Card>
    );
};

export default CreateWaitingCar;
