export interface ReportInterface {
    deck_id: string
    deck_category: string
    title: string
    submitter_email?: string
    handleDeleteReport: (id: string) => void;
};
