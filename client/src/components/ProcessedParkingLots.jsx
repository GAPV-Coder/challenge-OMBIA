import { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import dayjs from 'dayjs';
import useFetch from '../hooks/useFetch';

const ProcessedParkingLots = () => {
    const [showTable, setShowTable] = useState(false);
    const { data, loading, error, fetchData } = useFetch();

    const handleProcessParking = () => {
        setShowTable(!showTable);
        if (!showTable) {
            fetchData('/processed-parking-list');
        }
    };

    useEffect(() => {
        if (showTable) {
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
            render: (parkedPosition) =>
                parkedPosition ? (
                    <span>{parkedPosition}</span>
                ) : (
                    <span>Vehicle in waiting queque</span>
                ),
        },
        {
            title: 'Parking processing date',
            dataIndex: 'parkingProcessedAt',
            key: 'parkingProcessedAt',
            render: (date) => dayjs(date).format('DD/MM/YYYY')
        },
    ];

    const dataSource = Array.isArray(data?.data.cars) ? data.data.cars : [];

    return (
        <div>
            <p>
                In this section you can list all processed parking lots by date.
                Just click on the “Parking processing list” button.
            </p>
            <Button
                type="primary"
                onClick={handleProcessParking}
                style={{ marginBottom: '15px' }}
            >
                Parking processing list
            </Button>
            {showTable && (
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    rowKey={(record) => record.originalPosition || record.id}
                />
            )}
            {error && (
                <p style={{ color: 'red' }}>
                    Failed to load data: {error.message}
                </p>
            )}
        </div>
    );
};

export default ProcessedParkingLots;
