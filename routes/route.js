module.exports = function (req, res) {
    const today = new Date();
    const todayDate = today.toISOString();
    let result = todayDate.slice(0, 10);
    const x = ("'" + result + "T00:00:00.000Z" + "'")
    const req_message = ("SELECT DataCode,DataValue FROM tbCommonData WHERE DataType = 'WORK_DAY'")
    // console.log(req_message)
    const request = req.app.locals.db.query(req_message, function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return
        }
        // res.status(200).json({ message: 'Success' })
        res.send(data.recordset);
        // console.log(data.recordset);
        console.log("Send");

        const objectDate = new Date();
        let day = objectDate.getDate();
        let month = objectDate.getMonth() + 1;
        let year = objectDate.getFullYear();
        if (day < 10) {
            day = '01';
        }

        if (month < 10) {
            month = `0${month}`;
        }
        let format = `${year}${month}${day}`;

        data.recordset.filter((e) => {
            // console.log(e);
            if (e.DataCode == format) {
                const newValueProd = e.DataValue;
                console.log(newValueProd);
            }
        });
    })

}