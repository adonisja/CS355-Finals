<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {queryType === 'DirectorsList' && <DirectorsList db={db} />}
          {queryType === 'TopRated' && <TopRated db={db} />}
          {queryType === 'MoviesByYear' && <MoviesByYear db={db} />}
        </View>