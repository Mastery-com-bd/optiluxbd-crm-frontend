import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 24,
        fontSize: 12,
        fontFamily: 'Helvetica',
    },
    card: {
        backgroundColor: '#fefbe8', // Light yellow background
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        marginBottom: 8,
        fontWeight: 'bold',
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
        padding: 6,
        borderBottom: '1pt solid #000',
        fontWeight: 'bold',
    },
    tableCell: {
        flex: 1,
        padding: 6,
        borderBottom: '1pt solid #000',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
});

const PaymentDetails: React.FC<{ invoiceData: any }> = ({ invoiceData }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.card}>
                    {/* Invoice & Store Details */}
                    <View style={{ marginBottom: 16 }}>
                        <Text style={{ fontSize: 16, marginBottom: 10 }}>Invoice</Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{invoiceData.store.name}</Text>
                        <Text style={{ fontSize: 12 }}>{invoiceData.store.address}</Text>
                        <Text style={{ fontSize: 12 }}>Invoice No: {invoiceData.invoiceNo}</Text>
                        <Text style={{ fontSize: 12 }}>Order: {invoiceData.orderId}</Text>
                        <Text style={{ fontSize: 12 }}>ISSUED on: {invoiceData.issuedDate}</Text>
                        <Text style={{ fontSize: 12 }}>Payment Due: {invoiceData.dueDate}</Text>
                    </View>

                    {/* Billing Info */}
                    <View style={{ marginBottom: 16 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Bill To</Text>
                        <Text style={{ fontSize: 12 }}>{invoiceData.customer.name}</Text>
                        <Text style={{ fontSize: 12 }}>{invoiceData.customer.phone}</Text>
                        <Text style={{ fontSize: 12 }}>{invoiceData.customer.address}</Text>
                    </View>

                    {/* Payment Table */}
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCellHeader}>Product Name</Text>
                            <Text style={styles.tableCellHeader}>Quantity</Text>
                            <Text style={styles.tableCellHeader}>Unit Price</Text>
                            <Text style={styles.tableCellHeader}>Total</Text>
                        </View>
                        {invoiceData.products.map((item: any, index: number) => (
                            <View style={styles.tableRow} key={index}>
                                <Text style={styles.tableCell}>{item.name}</Text>
                                <Text style={styles.tableCell}>{item.quantity}</Text>
                                <Text style={styles.tableCell}>{item.unitPrice} BDT</Text>
                                <Text style={styles.tableCell}>{item.total} BDT</Text>
                            </View>
                        ))}
                    </View>

                    {/* Totals */}
                    <View style={styles.totalRow}>
                        <Text>Subtotal:</Text>
                        <Text>{invoiceData.subtotal} BDT</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text>Delivery Charge:</Text>
                        <Text>{invoiceData.deliveryCharge} BDT</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text>Discount:</Text>
                        <Text>{invoiceData.discount} BDT</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={{ fontWeight: 'bold' }}>Grand Total:</Text>
                        <Text style={{ fontWeight: 'bold' }}>{invoiceData.total} BDT</Text>
                    </View>
                </View>

                {/* Payment Info */}
                <Text style={{ textAlign: 'right', marginBottom: 10 }}>
                    Payment Method: {invoiceData.paymentMethod}
                </Text>

                {/* Footer */}
                <Text style={{ textAlign: 'center', fontSize: 10, marginTop: 20 }}>
                    Thank you for your business!
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 10 }}>
                    For any queries, contact us at support@yourstore.com
                </Text>
            </Page>
        </Document>
    );
};

export default PaymentDetails;