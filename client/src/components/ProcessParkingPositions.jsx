import { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import dayjs from 'dayjs';
import useFetch from '../hooks/useFetch';

const ProcessParkingPositions = () => {
    const [showTable, setShowTable] = useState(false);
    const { data, loading, error, fetchData } = useFetch();

    const processParking = async () => {
        try {
            await fetchData('/process-parking', 'POST', {});
            if (!error) {
                setShowTable(true);
                message.success('Parking positions processed successfully!.');
            }
        } catch (err) {
            message.error('Failed to precess parking positions.');
            console.error('Error: ', err);
        }
    };

    useEffect(() => {
        if (showTable && data) {
            console.log('Data waiting car list', data);
        }
    }, [data, showTable]);

    const columns = [
        {
            title: 'Original position',
            dataIndex: 'originalPosition',
            key: 'originalPosition',
            render: (originalPosition) => <span>{originalPosition}</span>,
        },
        {
            title: 'Parking position',
            dataIndex: 'parkedPosition',
            key: 'parkedPosition',
            render: (parkedPosition) => (
                <span>
                    {parkedPosition !== null
                        ? parkedPosition
                        : 'Waiting for parking'}
                </span>
            ),
        },
        {
            title: 'Parking processing date',
            dataIndex: 'parkingProcessedAt',
            key: 'parkingProcessedAt',
            render: (parkingProcessedAt) => (
                <span>
                    {parkingProcessedAt !== null
                        ? dayjs(parkingProcessedAt).format('DD/MM/YYYY')
                        : 'Date parking not available'}
                </span>
            ),
        },
    ];

    const dataSource = Array.isArray(data?.data) ? data.data : [];

    return (
        <div>
            <p>
                In this section you will be able to process the parking spaces
                according to availability, just click on the button “Process
                parking”
            </p>
            {error && (
                <p style={{ color: 'red' }}>
                    Failed to load data: {error.message}
                </p>
            )}
            <Button
                type="primary"
                onClick={processParking}
                style={{ marginBottom: '15px' }}
            >
                Process parking
            </Button>
            {showTable && (
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    rowKey={(record) => record.originalPosition || record.id}
                />
            )}
        </div>
    );
};

export default ProcessParkingPositions;
