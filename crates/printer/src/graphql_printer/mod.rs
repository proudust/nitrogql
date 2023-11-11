use sourcemap_writer::SourceMapWriter;

mod ast;
mod base;
mod schema;
mod tests;
mod utils;

pub trait GraphQLPrinter {
    fn print_graphql(&self, writer: &mut impl SourceMapWriter);
}
