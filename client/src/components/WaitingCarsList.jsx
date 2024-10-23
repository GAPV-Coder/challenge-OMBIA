import { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import useFetch from '../hooks/useFetch';

const WaitingCarsList = () => {
    const [showTable, setShowTable] = useState(false);
    const { data, loading, error, fetchData } = useFetch();

    const loadWaitingCars = () => {
        setShowTable(!showTable);
        if (!showTable) {
            fetchData('/waiting');
        }
    };

    useEffect(() => {
        if (showTable) {
            console.log('Data waiting car list', data);
        }
    }, [data, showTable])

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
            render: (parkingProcessedAt) =>
                parkingProcessedAt ? (
                    <span>{parkingProcessedAt}</span>
                ) : (
                    <span>No processing date</span>
                ),
        },
    ];

    const dataSource = Array.isArray(data?.data) ? data.data : [];

    return (
        <div>
            <p>
                In this section you can see the cars that are on the waiting
                list for a parking space.
            </p>
            <Button type="primary" onClick={loadWaitingCars} style={{ marginBottom: '15px'}}>
                Waiting cars
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

export default WaitingCarsList;
