import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ statusOpen, onCloseModal }) {
    const [open, setOpen] = React.useState(false);
    const contactWa = `https://api.whatsapp.com/send/?phone=6283863683761&app_absent=0`;

    React.useEffect(() => {
        setOpen(statusOpen);
    }, [statusOpen]);

    const handleClose = () => {
        setOpen(false);
        onCloseModal();
    };

    const handleSendMessage = (values) => {
        const message = `Halo Dapoer Sakha, Saya ${values.nama}. Saya ingin memesan: ${values.pesanan}. Anda dapat menghubungi saya di Nomor Telepon / WhatsApp: ${values.nomorHp}. atau Email: ${values.email}. Terima Kasih`;
        const encodedMessage = encodeURIComponent(message);
        const contactWaWithMessage = `${contactWa}&text=${encodedMessage}`;

        window.open(contactWaWithMessage, '_blank');

        console.log('Pesan telah dikirim!');
        handleClose()
    };

    return (
        <div>
            <Modal
                open={statusOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{
                    ...style,
                    width: '90%',
                    maxWidth: '600px',
                }}>
                    <Typography sx={{ marginBottom: '20px' }} id="modal-modal-title" variant="h6" component="h2">
                        Form Pemesanan
                    </Typography>
                    <Formik
                        initialValues={{
                            nama: '',
                            nomorHp: '',
                            email: '',
                            pesanan: ''
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(false);
                            handleSendMessage(values);
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.nama) {
                                errors.nama = 'Nama wajib diisi!';
                            }
                            if (!values.nomorHp) {
                                errors.nomorHp = 'Nomor telepon wajiib diisi!';
                            }
                            if (!values.email) {
                                errors.email = 'Email harus diisi!';
                            }
                            if (!values.pesanan) {
                                errors.pesanan = 'Cukup tuliskan Nama pesanan dan Quantity saja!';
                            }
                            return errors;
                        }}
                    >

                        {({ isSubmitting }) => (
                            <Form>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex gap-5'>
                                        <div className='w-full flex flex-col gap-1'>
                                            <Field
                                                name="nama"
                                                as={TextField}
                                                sx={{ width: '100%' }}
                                                label="Nama"
                                                variant="outlined"
                                            />
                                            <ErrorMessage name="nama" render={msg => <div className="error-message text-red-600 text-xs">{msg}</div>} />
                                        </div>
                                        <div className='w-full  flex flex-col gap-1'>
                                            <Field
                                                name="nomorHp"
                                                as={TextField}
                                                sx={{ width: '100%' }}
                                                label="No Phone / WhatsApp"
                                                variant="outlined"
                                            />
                                            <ErrorMessage name="nomorHp" render={msg => <div className="error-message text-red-600 text-xs">{msg}</div>} />
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <div className='flex flex-col gap-1'>
                                            <Field
                                                name="email"
                                                as={TextField}
                                                sx={{ width: '100%' }}
                                                label="Email"
                                                variant="outlined"
                                            />
                                            <ErrorMessage name="email" render={msg => <div className="error-message text-red-600 text-xs">{msg}</div>} />
                                        </div>
                                    </div>
                                    <div className='w-full mt-3'>
                                        <div className='flex flex-col gap-1'>
                                            <Field
                                                name="pesanan"
                                                as={TextField}
                                                sx={{ width: '100%', height: '100%' }}
                                                label="Pesanan Anda"
                                                multiline
                                                rows={8}
                                                variant="outlined"
                                                onBlur={(e) => {
                                                    e.target.form.dispatchEvent(new Event('submit', { cancelable: true }));
                                                }}
                                            />
                                            <ErrorMessage name="pesanan" render={msg => <div className="error-message text-red-600 text-xs">{msg}</div>} />
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                            Kirim Pesan
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </div>
    );
}
