import React from 'react';
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font
} from '@react-pdf/renderer';
import { OrderItem } from '@/types/orders';

const styles = StyleSheet.create({
    page: {
        padding: 24,
        fontSize: 12,
        fontFamily: 'Helvetica',
    },
    sectionTitle: {
        fontSize: 14,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        width: '31%',
        border: '1pt solid #ccc',
        padding: 10,
        borderRadius: 4,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    table: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCellHeader: {
        flex: 1,
        backgroundColor: '#efefef',
        padding: 6,
        borderRight: '1pt solid #000',
        fontWeight: 'bold',
    },
    tableCell: {
        flex: 1,
        padding: 6,
        borderRight: '1pt solid #000',
        borderTop: '1pt solid #000',
    },
    tableLastCell: {
        flex: 1,
        padding: 6,
        borderTop: '1pt solid #000',
    },
    totalSection: {
        marginTop: 20,
        alignSelf: 'flex-end',
        width: '50%',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
});


const OrderDetail: React.FC<{ order: OrderItem }> = ({ order }) => {
    const { products, customer } = order;
    const { totalAmount } = order;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>Order Details</Text>

                {/* Top 3 columns */}
                <View style={styles.cardContainer}>
                    {/* Order Info */}
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Order Info:</Text>
                        <View style={styles.row}>
                            <Text>Order Date:</Text>
                            <Text>{new Date(order?.orderDate).toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Delivery Date:</Text>
                            <Text>not provided</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Product ID:</Text>
                            <Text>ID</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Status:</Text>
                            <Text>{order.status}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Payment Status:</Text>
                            <Text>{order.paymentStatus ?? 'paid'}</Text>
                        </View>
                    </View>

                    {/* Customer Info */}
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Customer Info:</Text>
                        <View style={styles.row}>
                            <Text>Name:</Text>
                            <Text>{customer.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Email:</Text>
                            <Text>{customer.email}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Call:</Text>
                            <Text>{customer.phone}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Address:</Text>
                            <Text>not provided...</Text>
                        </View>
                    </View>

                    {/* Company Info */}
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Company Details:</Text>
                        <View style={styles.row}>
                            <Text>Name:</Text>
                            <Text>OptiluxBD</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Email:</Text>
                            <Text>OptiluxBD.com</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Call:</Text>
                            <Text>019.....</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Address:</Text>
                            <Text>not provided...</Text>
                        </View>
                    </View>
                </View>

                {/* Product Table */}
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Product ID</Text>
                        <Text style={styles.tableCellHeader}>Product Name</Text>
                        <Text style={styles.tableCellHeader}>Qty</Text>
                        <Text style={styles.tableCellHeader}>Price</Text>
                        <Text style={styles.tableCellHeader}>Tax</Text>
                        <Text style={styles.tableCellHeader}>Subtotal</Text>
                    </View>

                    {/* Product Rows */}
                    {products?.map((product) => (
                        <View style={styles.tableRow} key={product.id}>
                            <Text style={styles.tableCell}>{product.sku}</Text>
                            <Text style={styles.tableCell}>{product.name}</Text>
                            <Text style={styles.tableCell}>{product.quantity}</Text>
                            <Text style={styles.tableCell}>{product.price}</Text>
                            <Text style={styles.tableCell}>৳0.00</Text>
                            <Text style={styles.tableLastCell}>
                                {Number(product.price) * product.quantity}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Totals */}
                <View style={styles.totalSection}>
                    <View style={styles.totalRow}>
                        <Text>Total Products:</Text>
                        <Text>{products?.length}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text>Total Quantity:</Text>
                        <Text>
                            {products?.reduce((acc, cur) => acc + cur.quantity, 0)}
                        </Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text>Total Tax:</Text>
                        <Text>৳0.00</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text>Total Amount:</Text>
                        <Text>৳{totalAmount}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default OrderDetail;