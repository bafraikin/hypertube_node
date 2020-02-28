import axios from "axios"

interface Filter {
	firstYear: number, 
	lastYear: number, 
	minMark: number, 
	maxMark: number,
	genders: Array<number>
}

class TMDBClient {
	baseUrl: string = "https://api.themoviedb.org/3/";
	apiKey: string | undefined = process.env.OMDB_KEY;
	service?: string;
	filter?: Filter;

	constructor() {
	}

	defaultGetQuery() {
		return  (this.baseUrl + this.service + "?api_key=" + this.apiKey + "&include_adult=false" + "&include_video=true" + "&language=en-US");
	}
}

class TMDBClientDiscover extends TMDBClient {
	service: string = "discover/movie";
	baseQuery: string;

	constructor(movieFilter: Filter) {
		super();
		this.filter = movieFilter;
		this.baseQuery = this.defaultGetQuery() + "&primary_release_date.gte=" + this.filter.firstYear + "-01-01"  + "&primary_release_date.lte=" + this.filter.lastYear + "-01-01" + "&vote_average.gte=" + this.filter.minMark + "&vote_average.lte=" + this.filter.maxMark + "&sort_by=popularity.desc" +  this.withGenres();
	}

	withGenres(): string {
			if (this.filter instanceof Object && this.filter.genders && this.filter.genders.length > 0)
				return "&with_genres=" + encodeURI(this.filter.genders.join(","));
			else
				return "";
	}

	async getPage(page: number = 1) {
		return axios.get(this.baseQuery + "&page=" + page);
	}
}


class TMDBClientSearch extends TMDBClient {
	service: string = "search/movie";
	baseQuery: string;

	constructor(query: string) {
		super();
		this.baseQuery = this.defaultGetQuery() + "&query=" + encodeURI(query);
	}

	async getPage(page: number = 1) {
		return axios.get(this.baseQuery + "&page=" + page);
	}
}



export {Filter, TMDBClientSearch, TMDBClientDiscover};
