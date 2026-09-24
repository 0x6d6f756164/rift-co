export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  place: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "The Field Jacket has been through two winters and a job change. It still looks like the first week I wore it.",
    name: "Marisol T.",
    place: "Portland, OR",
  },
  {
    id: "t2",
    quote:
      "Ordered the wrong size, got a replacement before the return even landed back at the warehouse. That's rare.",
    name: "Devon K.",
    place: "Austin, TX",
  },
  {
    id: "t3",
    quote:
      "I stopped buying tees anywhere else after the Overdyed. The fade is actually intentional and it holds up in the wash.",
    name: "Priya N.",
    place: "Chicago, IL",
  },
];
