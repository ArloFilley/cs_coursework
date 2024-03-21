use rocket::{response::content::RawHtml, Request};

#[catch(404)]
pub fn api_not_found(req: &Request) -> String {
    format!("Sorry, '{}' couldn't be found.", req.uri())
}

#[catch(404)]
pub fn frontend_not_found<'a>(_req: &Request) -> RawHtml<&'a str> {
    RawHtml(include_str!("../../public/Error/not_found.html"))
}

#[catch(404)]
pub fn documentation_not_found<'a>(_req: &Request) -> RawHtml<&'a str> {
    RawHtml(include_str!("../../documentation/not_found.html"))
}