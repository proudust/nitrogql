use graphql_parser::query::Document;

use crate::source_map_writer::writer::SourceMapWriter;

use super::type_printer::TypePrinter;

pub struct QueryTypePrinterOptions {
    /// Name of the root TypeScript type that contains schema types.
    pub schema_root: String,
    /// Suffix for type of query result.
    pub query_result_suffix: String,
    /// Suffix for type of mutation result.
    pub mutation_result_suffix: String,
    /// Suffix for type of subscription result.
    pub subscription_result_suffix: String,
    /// Suffix for type of variables for an operation.
    pub variable_type_suffix: String,
    /// Suffix for variable of query.
    pub query_variable_suffix: String,
    /// Suffix for variable of mutation.
    pub mutation_variable_suffix: String,
    /// Suffix for variable of subscription.
    pub subscription_variable_suffix: String,
    /// Source of TypedDocumentNode to import from.
    pub typed_document_node_source: String,
}

impl Default for QueryTypePrinterOptions {
    fn default() -> Self {
        QueryTypePrinterOptions {
            schema_root: "Schema".into(),
            query_result_suffix: "Query".into(),
            mutation_result_suffix: "Mutation".into(),
            subscription_result_suffix: "Subscription".into(),
            variable_type_suffix: "Variables".into(),
            query_variable_suffix: "Query".into(),
            mutation_variable_suffix: "Mutation".into(),
            subscription_variable_suffix: "Subscription".into(),
            typed_document_node_source: "@graphql-typed-document-node/core".into(),
        }
    }
}

pub struct QueryTypePrinter<'a, Writer: SourceMapWriter> {
    options: QueryTypePrinterOptions,
    writer: &'a mut Writer,
}

impl<'a, Writer> QueryTypePrinter<'a, Writer>
where
    Writer: SourceMapWriter,
{
    pub fn new(options: QueryTypePrinterOptions, writer: &'a mut Writer) -> Self {
        QueryTypePrinter { options, writer }
    }

    pub fn print_document(&mut self, document: &Document<'_, String>) {
        self.writer.write(&format!(
            "import type {{ TypedDocumentNode }} from \"{}\";\n\n",
            self.options.typed_document_node_source
        ));
        document.print_type(&self.options, self.writer);
    }
}
