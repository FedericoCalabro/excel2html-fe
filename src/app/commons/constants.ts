export class TOOLTIP_DEFINITIONS {
    static COLUMNS_MERGING_DESCR : string = "Create a new column by mergind two or more columns from the excel. The only requirements will be to select at least 2 columns, choose a column name that is not already present and if choosing a card follow this syntax: something {{1}} somethingelse {{2}}.";
    static COLUMNS_MERGING_SYNC : string = "Please sync merged columns changes or these columns will be ignored! Please note this will reset order and some other stuff, it should be done as your first step!"
    static GRAPHICS_DESCR : string = "Please note that in case of a CARD, your first column will be the Title Header of the card"
    static ROWS_FILTER_DESCR : string = "Decide your own criterias to filter your excel file. Only rows that matches all criterias will be displayed, please pay attention to insert the correct type. Regex are JAVA ones. If cannot cast to Number, that row will be ignored"
    static ROWS_AGGREGATION_DESCR : string = "Currently you are allowed to block a max of 1 col per row built with this aggregation framework builder, and the column must be of type Number. Note in order to see something in the final table, you have to at least build one aggregation row."
    static ROWS_SORT_DESCR : string = "Note, if casting to Number fails, that row will be ignored during sorting process."
    static UPLOAD_DESCR : string = "Please make sure your excel file does not contain any spare rows or columns. Otherwise results might be unpredictable."
    static GRAPHICS_CARD_TITLE_DESCR : string = "WIP"
    static GRAPHICS_PLOT_COLOR : string = "With Scatter Plot Type, several data sets will be found blocking a certain column, so you can choose a color for each one on theme, in the order they will be find. If a theme won't be select, a random color will be generated"
}