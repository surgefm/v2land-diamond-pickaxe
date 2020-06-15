def todo_to_site_obj(todo_line: str):
    site_name = todo_line.split("- [ ]  ")[-1]
    site_obj = (
        f"- name: {site_name}\n"
        "  rssUrls:\n"
        "    - http\n"
        "  shouldParseFulltext: true\n"
        "  dynamicLoading: false\n"
    )
    return site_obj


if __name__ == "__main__":
    with open("supported_sites.md", "r") as supported_site_file:
        todos = supported_site_file.readlines()

    sites = [todo_to_site_obj(todo) for todo in todos]
    sites = "".join(sites)
    print(sites)
