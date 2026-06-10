import DOMPurify from "dompurify";

export const sanitize = (content) => {
    return DOMPurify.sanitize(content);
};
