const SUPABASE_URL = 'https://kzldzoahblcypgytcfej.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6bGR6b2FoYmxjeXBneXRjZmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIzMDU3NjcsImV4cCI6MTk2Nzg4MTc2N30.j_yg92pc7aweQmR0W4XIaPpIV3g7KQZogm27VeEfxDU';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export async function getFamilies() {
    const response = await client.from('loving_families').select('*, fuzzy_bunnies(*)');
        
    // fetch all families and their bunnies
    
    return checkError(response);
    
}

export async function deleteBunny(id) {
    const response = await client.from('fuzzy_bunnies').delete().match({ id: id }).single();
    // delete a single bunny using the id argument
    
    return checkError(response);
}

export async function createBunny(bunny) {
    const response = await client.from('fuzzy_bunnies').insert(bunny);
    // create a bunny using the bunny argument
    
    return checkError(response);
}

// MARTHA STEWART (PRE-MADE) FUNCTIONS

export async function checkAuth() {
    const user = getUser();
    
    if (!user) location.replace('../');
}

export async function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./families');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });
    
    return response.user;
}

export async function logout() {
    await client.auth.signOut();
    
    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

// Create your own supabase database using the provided seeds.sql file