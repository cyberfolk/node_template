const express = require("express");
const router = express.Router();
const Contact = require('../models/Contact');

router.get('/', async (req, res) => {
    const contacts = await Contact.find({});
    const contacts2 = JSON.stringify(contacts, null, 2);
    res.render('pages/contacts/contacts', { title: 'Contacts', contacts: contacts2, layout: 'layouts/main' });
});

module.exports = router;
