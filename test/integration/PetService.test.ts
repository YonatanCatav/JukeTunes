import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { Playlist } from '../../src/api/models/Playlist';
import { PlaylistService } from '../../src/api/services/PlaylistService';
import { closeDatabase, createDatabaseConnection, migrateDatabase } from '../utils/database';
import { configureLogger } from '../utils/logger';

describe('playlistService', () => {

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    let connection: Connection;
    beforeAll(async () => {
        configureLogger();
        connection = await createDatabaseConnection();
    });
    beforeEach(() => migrateDatabase(connection));

    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------

    afterAll(() => closeDatabase(connection));

    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    test('should create a new playlist in the database', async (done) => {
        const playlist = new Playlist();
        playlist.id = 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx';
        playlist.name = 'test';
        const service = Container.get<PlaylistService>(PlaylistService);
        const resultCreate = await service.create(playlist);
        expect(resultCreate.name).toBe(playlist.name);

        const resultFind = await service.findOne(resultCreate.id);
        if (resultFind) {
            expect(resultFind.name).toBe(playlist.name);
        } else {
            fail('Could not find playlist');
        }
        done();
    });

});
