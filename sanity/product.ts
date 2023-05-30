import { defineField } from "sanity";

export const product = {
    name: 'product',
    type: 'document',
    title:'Product',
    fields: [
        {
            name:'title',
            title:'Title',
            type: 'string'
        },
        {
            name:'description',
            title:'Desription',
            type: 'string'
        },
        {
            name:'image',
            title:'Image',
            type: 'image'
        },
        {
            name:'price',
            title:'Price',
            type: 'number'
        },
        defineField({
            name:'category',
            title:'Category',
            type: 'reference',
            to: {
                type: 'category'
            }
        }),
        {
            name:'details',
            title:'Details',
            type: 'string'
        }
        
    ]
    }