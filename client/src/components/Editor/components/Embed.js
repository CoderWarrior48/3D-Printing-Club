import DOMPurify from 'dompurify';

const Embed = {

    fields: {
        embededHtml: {
            label: "Embeded Code",
            type: "textarea",
        }
    },
    render: ({embededHtml}) => {
        return <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(embededHtml)}} />;
    },
};

export default Embed;