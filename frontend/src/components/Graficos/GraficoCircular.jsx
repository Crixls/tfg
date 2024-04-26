import React, { useEffect, useState } from 'react';
import { getFavorites } from '../../api/useCases';
import { useAuthContext } from '../../context/useAuthContext';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

const GraficoCircular = ({favorites}) => {


    return (
        <div className='w-full h-1/2'>
            <ResponsiveContainer>
                <PieChart>
                    <Pie 
                        dataKey="value"
                        data={favorites}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraficoCircular;
